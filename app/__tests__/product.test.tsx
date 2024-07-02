import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Products from "@/app/page.tsx";
import { useProducts } from "@/app/context/ProductProvider";

jest.mock("./context/ProductProvider");

describe("Products Component", () => {
  beforeEach(() => {
    useProducts.mockReturnValue({
      state: {
        isInitialized: true,
        products: [
          { id: 1, title: "Product 1", category: "electronics" },
          { id: 2, title: "Product 2", category: "jewelery" },
        ],
        categories: ["electronics", "jewelery"],
      },
      dispatch: jest.fn(),
    });
  });

  test("renders Products component with initial state", () => {
    render(<Products />);

    expect(screen.getByText("Todos tus productos")).toBeInTheDocument();

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    const selectElement = screen.getByLabelText("Filtra por categoría:");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.childNodes.length).toBe(5);

    fireEvent.change(selectElement, { target: { value: "electronics" } });

    expect(
      screen.getByText("Tus productos de electronics")
    ).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });
});
