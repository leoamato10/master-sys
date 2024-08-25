import { render, screen } from "@testing-library/react";
import TeacherForm from "../TeacherForm";

test("renders the form with correct fields", () => {
  render(<TeacherForm type="create" />);

  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Blood Type/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Sex/i)).toBeInTheDocument();
  expect(screen.getByText(/Upload a photo/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Create/i })).toBeInTheDocument();
});
