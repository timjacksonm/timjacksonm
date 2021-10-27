import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'tgu4sak0', // find this at manage.sanity.io or in your sanity.json
  dataset: 'production', // this is from those question during 'sanity init'
  apiVersion: '2021-10-01', // required to prevent deprecation warning.
  useCdn: true,
});
