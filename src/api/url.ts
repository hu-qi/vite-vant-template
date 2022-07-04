export default {
  github: {
    zen: '/zen'
  },
  repositories: (user: String) => {
    return `/users/${user}/repos`
  }
}
