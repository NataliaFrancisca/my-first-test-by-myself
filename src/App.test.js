import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('form elements must render corretly', () => {
  render(<App />);

  const legendElement = screen.queryByText("Create Account");
  expect(legendElement).toBeInTheDocument();

  const labelNameElement = screen.queryByLabelText("Name:");
  expect(labelNameElement).toBeInTheDocument();

  const labelAgeElement = screen.queryByLabelText("Age:");
  expect(labelAgeElement).toBeInTheDocument();

  const labelCityElement = screen.queryByLabelText("City:");
  expect(labelCityElement).toBeInTheDocument();

  const buttonElement = screen.queryByText('Create');
  expect(buttonElement).toBeInTheDocument();
})

test('inputs placeholder texts are render corretly', () => {
  render(<App />);

  const nameInputPlaceholder = screen.queryByPlaceholderText("type your name");
  expect(nameInputPlaceholder).toBeInTheDocument();

  const ageInputPlaceholder = screen.queryByPlaceholderText("type your age");
  expect(ageInputPlaceholder).toBeInTheDocument();

  const cityInputPlaceholder = screen.queryByPlaceholderText("type your city");
  expect(cityInputPlaceholder).toBeInTheDocument();
})

test('after the button clicked, all the inputs values are get corretly', () => {
  render(<App />);

  const buttonSubmit = screen.queryByRole("button", {name: "Create"})
  const nameInput = screen.queryByPlaceholderText("type your name");
  const ageInput = screen.queryByPlaceholderText("type your age");
  const cityInput = screen.queryByPlaceholderText("type your city");

  fireEvent.change(nameInput, {
    target: {
      value: "Natalia"
    }
  })

  fireEvent.change(ageInput, {
    target: {
      value: 22
    }
  })

  fireEvent.change(cityInput, {
    target: {
      value: 'São Paulo'
    }
  })

  fireEvent.click(buttonSubmit, new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  }))

  const nameInputTyped = screen.queryByText("Natalia");
  const ageInputTyped = screen.queryByText(22);
  const cityInputTyped = screen.queryByText("São Paulo");

  expect(nameInputTyped).toHaveTextContent("Natalia"); 
  expect(ageInputTyped).toHaveTextContent(22); 
  expect(cityInputTyped).toHaveTextContent("São Paulo");
})

test('the article element don`t shows in the first time', () => {
  render(<App />);

  const buttonSubmit = screen.queryByRole("button", {name: "Create"})

  fireEvent.click(buttonSubmit, new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  }))

  const messageElement = screen.queryByRole("article");
  expect(messageElement).not.toBeInTheDocument();
})

test('the error message element shows corretly', () => {
  render(<App />);

  const buttonSubmit = screen.queryByRole("button", {name: "Create"})

  fireEvent.click(buttonSubmit, new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  }))

  const errorMessageElement = screen.queryByText("You need to fill all the inputs");
  expect(errorMessageElement).toBeInTheDocument();
})
