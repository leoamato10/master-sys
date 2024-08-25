import React from "react";
import { render, screen, within } from "@testing-library/react";
import Table from "../Table";

describe("Table component", () => {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age", className: "age-column" },
  ];
  const data = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
  ];
  const renderRow = (item: any) => (
    <tr key={item.name}>
      <td>{item.name}</td>
      <td>{item.age}</td>
    </tr>
  );

  it("renders basic table structure", () => {
    const { getByRole } = render(
      <Table columns={columns} data={data} renderRow={renderRow} />
    );
    const table = getByRole("table");
    expect(table).toBeInTheDocument();

    // Buscar el thead por su rol actual de "definition"
    const thead = within(table).getByRole("definition");
    expect(thead).toBeInTheDocument();

    // Verificar que el thead contiene la fila de encabezados
    const headerRow = within(thead).getByRole("row");
    expect(headerRow).toBeInTheDocument();
  });

  it("renders correct number of columns with correct headers", () => {
    render(<Table columns={columns} data={data} renderRow={renderRow} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveTextContent("Name");
    expect(headers[1]).toHaveTextContent("Age");
  });

  it("renders correct number of rows", () => {
    render(<Table columns={columns} data={data} renderRow={renderRow} />);
    const rows = screen.getAllByRole("row");
    // +1 for the header row
    expect(rows).toHaveLength(data.length + 1);
  });

  it("applies correct CSS classes", () => {
    render(<Table columns={columns} data={data} renderRow={renderRow} />);
    expect(screen.getByRole("table")).toHaveClass("w-full mt-4");
    expect(screen.getAllByRole("columnheader")[1]).toHaveClass("age-column");
  });

  it("handles empty data array", () => {
    render(<Table columns={columns} data={[]} renderRow={renderRow} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryAllByRole("row")).toHaveLength(1); // Only header row
  });
});
