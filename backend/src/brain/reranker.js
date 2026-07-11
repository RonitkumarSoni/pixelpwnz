import { AutoTokenizer, AutoModelForSequenceClassification, env } from '@huggingface/transformers';

// Ensure models don't crash when memory is tight
env.backends.onnx.wasm.numThreads = 1;

let _tokenizer = null;
let _model = null;

let _initPromise = null;

async function getReranker() {
  if (_tokenizer && _model) return { tokenizer: _tokenizer, model: _model };
  if (!_initPromise) {
    _initPromise = (async () => {
      const model_id = 'Xenova/ms-marco-MiniLM-L-6-v2';
      _tokenizer = await AutoTokenizer.from_pretrained(model_id);
      _model = await AutoModelForSequenceClassification.from_pretrained(model_id, { quantized: true });
    })();
  }
  await _initPromise;
  return { tokenizer: _tokenizer, model: _model };
}

/**
 * Score a single query-document pair.
 * Returns a sigmoid normalized score [0, 1].
 */
export async function scorePair(query, document) {
  const { tokenizer, model } = await getReranker();
  const safeQuery = query.length > 500 ? query.substring(0, 500) : query;
  const safeDoc = document.length > 2000 ? document.substring(0, 2000) : document;

  const inputs = await tokenizer(safeQuery, { text_pair: safeDoc, truncation: true, max_length: 512 });
  const { logits } = await model(inputs);
  const logit = logits.data[0];
  
  // Apply sigmoid to normalize to 0-1
  return 1 / (1 + Math.exp(-logit));
}

/**
 * Rerank an array of documents for a given query.
 * @param {string} query
 * @param {Array<Object>} results
 * @returns {Promise<Array<Object>>}
 */
export async function rerank(query, results) {
  if (!results.length) return [];
  
  const scored = await Promise.all(results.map(async (res) => {
    // The target text to evaluate against the query
    const docText = res.incoming || res.reply || '';
    const score = await scorePair(query, docText);
    return { ...res, rerankScore: score };
  }));

  // Sort descending by rerank score
  return scored.sort((a, b) => b.rerankScore - a.rerankScore);
}
