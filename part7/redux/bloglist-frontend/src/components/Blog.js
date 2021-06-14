import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getBlogs, likeBlog, addComment } from '../reducers/blogReducer.js'
import {
  Stack,
  Heading,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  UnorderedList,
  ListItem,
  Text,
  Link,
} from '@chakra-ui/react'
export const Blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(user => user.id === id))
  useEffect(() => {
    dispatch(getBlogs())
  }, [])
  if (!blog) return null
  const handleLike = _ => {
    dispatch(likeBlog(blog))
  }

  const handleAddComment = event => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }
  return (
    <Stack spacing={4}>
      <Heading>{blog.title}</Heading>
      <Link color='teal' to={blog.url}>
        {blog.url}
      </Link>
      <Text>
        {blog.likes} likes <Button onClick={handleLike}>like</Button>
      </Text>
      <Text>added by {blog.author}</Text>
      <Heading>comments</Heading>
      <form onSubmit={handleAddComment}>
        <InputGroup>
          <Input
            pr='8rem'
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <InputRightElement w='8rem'>
            <Button h='1.75rem' size='sm'>
              add comment
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
      {blog.comments && (
        <>
          <UnorderedList>
            {blog.comments.map(comment => (
              <ListItem key={comment}>{comment}</ListItem>
            ))}
          </UnorderedList>
        </>
      )}
    </Stack>
  )
}
