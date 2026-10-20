import type { ProjectEntry } from './types';
export const projects: ProjectEntry[] = [{
  kind:'project',id:'multimodal-news-rag',sections:['projects'],title:'Multimodal News RAG',start:'2026',context:'unspecified',summary:'Retrieval-augmented generation over 1,023 news article–image pairs, benchmarking text-only, caption-based, and actual-image retrieval.',stack:['python','sbert','clip','faiss','llm-apis'],tags:['rag','multimodal','evaluation'],highlights:['1,023 article–image pairs','150 held-out articles','Bootstrap confidence intervals'],bullets:[
    'Built a news RAG pipeline combining text/image retrieval and vision-enabled generation.',
    'Created duplicate-aware data splits and benchmarked three retrieval approaches under fixed settings.',
    'Evaluated claim-level faithfulness with modality ablations, image-conflict tests, and bootstrap confidence intervals.'
  ],
}];
