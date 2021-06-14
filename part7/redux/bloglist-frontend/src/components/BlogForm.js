import React, { useState } from 'react'
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleCreate}>
      <Heading>Create new blog</Heading>
      <br />
      <FormControl id='title'>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </FormControl>
      <FormControl id='author'>
        <FormLabel>Author</FormLabel>
        <Input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </FormControl>
      <FormControl id='url'>
        <FormLabel>Url</FormLabel>
        <Input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </FormControl>
      <Button id='create' type='submit' margin='.5em'>
        create
      </Button>
    </form>
  )
}
export default BlogForm
