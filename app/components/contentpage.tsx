//
// contentpage.tsx - a content detail page used for topics, blogs, biomarkers
//

import Link from "next/link"
import { GetStaticProps, GetStaticPaths } from "next"

import React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"

import Layout from "./layout"
import { Content } from "../lib/contents"
import { Biomarker } from "../lib/biomarkers"
import { ReferenceListItem } from "./listitems"
import { Section } from "./section"
import { BiomarkerListItem } from "./listitems"

interface ContentPageProps {
  /** Item that should be shown */
  item: Content
}

/** Shows a gallery of images with titles and optional subtitles arranged in tiles of variables sizes */
export function ContentPage({ item }: ContentPageProps) {
  const contentHtml = item.contentHtml ? item.contentHtml : "empty"

  const biomarkers = item.biomarkers as any as Biomarker[]

  return (
    <Layout title={item.title} subtitle={item.description} back={true}>
      <article id={item.id} title={item.title}>
        {contentHtml && (
          <Box mb={4}>
            <section>
              <div className="markdown" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </section>
          </Box>
        )}
        {biomarkers && (
          <Section title="Biomarkers">
            <List>
              {biomarkers.map((biomarker) => (
                <BiomarkerListItem key={biomarker.id} item={biomarker} />
              ))}
            </List>
          </Section>
        )}
        {item.references && (
          <Section title="References">
            <List>
              {item.references.map((ref: Content) => (
                <ReferenceListItem key={ref.id || ref.url} item={ref} />
              ))}
            </List>
          </Section>
        )}
      </article>
    </Layout>
  )
}
