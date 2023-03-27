import ContentLoader from 'react-content-loader'

export const InputLoader = (props: Record<string, unknown>) => (
  <ContentLoader
    speed={2}
    width={264}
    height={45}
    viewBox="0 0 264 45"
    backgroundColor="#c8c8e5"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="65" y="58" rx="0" ry="0" width="239" height="45" />
    <rect x="5" y="2" rx="7" ry="7" width="257" height="42" />
  </ContentLoader>
)
