import { OllamaConfig } from "../types";

export class Ollama {
  constructor(config: OllamaConfig | undefined) {
    this.completions = new Completions();
    this.url = config?.url ?? "http://localhost:11434"
  }

  completions: Completions;
  url: string;

}

class Completions {
  constructor() {

  }

  async create(body: any, _options: any) {
    const ollama_url = "https://api.anthropic.com/completions"
    const res = await fetch(`${ollama_url}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });
    return res.json()
  }
}
