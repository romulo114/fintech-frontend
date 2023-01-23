import React from 'react'


type DocArticleProps = {
  title: string;
  descs: string | DocArticleProps[];
}
export const DocArticle: React.FC<DocArticleProps> = (props) => {

  const { title, descs } = props

  return (
    <article>
      <h3>{title}</h3>
      <section>
        {Array.isArray(descs) ? (
          <>
            {descs.map(desc => (
              <React.Fragment key={desc.title}>
                <h4>
                  {desc.title}
                </h4>
                <p>{desc.descs as string}</p>
              </React.Fragment>
            ))}
          </>
        ) : (
          <p>{descs}</p>
        )}
      </section>
    </article>
  )
}
