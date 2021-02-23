// Configuring Prismic Client to interact with the API

import Prismic from '@prismicio/client'


export const apiEndpoint = `https://${process.env.PRISMIC_REPOSITORY}.cdn.prismic.io/api/v2`

// Access information stored in enviroment variables
// export const apiEndpoint = process.env.PRISMIC_URL
export const accessToken = process.env.PRISMIC_TOKEN

// Client method to query documents from the Prismic repo
export const Client = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
)

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  return {
    ...reqOption,
    ...accessTokenOption,
  }
}