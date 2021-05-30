const dummy = blogs => 1

const totalLikes = blogs =>
  blogs.reduce((prev, current) => prev + current.likes, 0)

const favoriteBlog = blogs =>
  blogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    {}
  )

const mostBlogs = blogs => {
  const uniqueAuthors = [...new Set(blogs.map(blog => blog.author))]

  return uniqueAuthors
    .map(author => {
      return {
        author: author,
        blogs: blogs.reduce(
          (accum, current) => (current.author === author ? accum + 1 : accum),
          0
        ),
      }
    })
    .reduce(
      (prev, current) => (prev.blogs > current.blogs ? prev : current),
      {}
    )
}

const mostLikes = blogs => {
  const uniqueAuthors = [...new Set(blogs.map(blog => blog.author))]

  return uniqueAuthors
    .map(author => {
      return {
        author: author,
        likes: blogs.reduce(
          (accum, current) =>
            current.author === author ? accum + current.likes : accum,
          0
        ),
      }
    })
    .reduce(
      (prev, current) => (prev.likes > current.likes ? prev : current),
      {}
    )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
