# 2024-08-ollama-ui
Simple UI that is able to communicate with a same-host ollama

## Requirements
- Ollama
- Running in a container, eg, docker or kubernetes

## Base functionality
When run in the console, the following snippet should be able to request ollama:

```
async function getData(prompt) {
  const decoder = new TextDecoder('utf-8');
  document.body.innerText = '';

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3.1',
        prompt
      })
    });
      
    const reader = response.body.getReader();
      
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }

        const text = JSON.parse(decoder.decode(value)).response;
        document.body.innerText = 
        `${document.body.innerText}${text}`
      }
  } catch (error) {
    console.error(error.message);
  }
}

getData("Where are the five Lagrange points around earth located?")


```
