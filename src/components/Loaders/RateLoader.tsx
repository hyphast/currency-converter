import ContentLoader from 'react-content-loader'

export const RateLoader = (props: Record<string, unknown>) => (
  <ContentLoader
    speed={2}
    width={175}
    height={31}
    viewBox="0 0 175 30.5"
    backgroundColor="#c8c8e5"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="65" y="58" rx="0" ry="0" width="239" height="45" />
    <rect x="0" y="3" rx="7" ry="7" width="175" height="26" />
  </ContentLoader>
)
