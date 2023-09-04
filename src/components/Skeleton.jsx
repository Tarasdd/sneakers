import React from "react"
import ContentLoader from "react-content-loader"

function Skeleton() {
  return (
    <ContentLoader 
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 210 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
    <rect x="0" y="105" rx="10" ry="10" width="150" height="15" /> 
    <rect x="0" y="127" rx="10" ry="10" width="93" height="15" /> 
    <rect x="0" y="165" rx="10" ry="10" width="80" height="24" /> 
    <rect x="113" y="159" rx="10" ry="10" width="32" height="32" />
  </ContentLoader>
  )
}

export default Skeleton;