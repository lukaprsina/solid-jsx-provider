import type { Component, JSX, ParentComponent } from "solid-js";

import { Show, createSignal } from "solid-js";
import { onMount } from "solid-js"
import { compile, run } from '@mdx-js/mdx'
import * as jsx_runtime from 'solid-jsx'
import { MDXProvider } from 'solid-jsx'


const MDX: Component = () => {
  const [Content, setContent] = createSignal<JSX.Element>();

  onMount(async () => {
    const code = String(await compile(
      "<Test>H1 Text</Test>",
      {
        outputFormat: 'function-body',
        jsxImportSource: 'solid-jsx',
        // providerImportSource: 'solid-jsx',
        // development: true,
        // format: 'mdx',
        // useDynamicImport: true,
      }
    ))

    console.log("code", code)
    const JSXContent = (await run(code, jsx_runtime)).default;
    console.log("content", JSXContent.toString())

    setContent(JSXContent)
  })

  return (
    <MDXProvider
      components={{
        ["Test"]: H1Test
      }}
    >
      <Show when={Content}>
        {Content()}
      </Show>
    </MDXProvider>
  )
}

const H1Test: ParentComponent = (props) => {
  return <h1>{props.children}</h1>
}

export default MDX;
