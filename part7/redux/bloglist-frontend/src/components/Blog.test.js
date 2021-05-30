import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let handleLike
  beforeEach(() => {
    handleLike = jest.fn()
    const blog = {
      title: 'El titulo',
      author: 'El autor',
      likes: 1,
      user: { name: 'Nombre' },
    }

    component = render(<Blog blog={blog} handleLike={handleLike} />)
    component.debug() // pass to console full component
  })
  test('the component displaying a blog renders the blog title and author, but does not render its url or number of likes by default', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('El titulo')
    expect(div).toHaveTextContent('El autor')
    expect(div).not.toHaveTextContent('1')
    expect(div).not.toHaveTextContent('Nombre')
  })
  test('the blog url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const div = component.container.querySelector('.blog')
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(div).toHaveTextContent('1')
    expect(div).toHaveTextContent('Nombre')
  })
  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
