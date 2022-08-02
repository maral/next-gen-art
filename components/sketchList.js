import Link from 'next/link'

export default function SketchList({ data, project }) {
  return (
    <section>
      <ol>
        {data.map((sketch, i) => (
          <li key={i}>
            <Link href={`/projects/${project}/${sketch.id}`}>
              <a>{sketch.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
