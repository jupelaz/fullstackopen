import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  let createBlog
  beforeEach(() => {
    createBlog = jest.fn()
    component = render(<BlogForm createBlog={createBlog} />)
    component.debug() // pass to console full component
  })
  test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(title, { target: { value: 'El titulo' } })
    fireEvent.change(author, { target: { value: 'El autor' } })
    fireEvent.change(url, { target: { value: 'La url' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0].title).toBe('El titulo')
    expect(createBlog.mock.calls[0][0].author).toBe('El autor')
    expect(createBlog.mock.calls[0][0].url).toBe('La url')
  })
})
