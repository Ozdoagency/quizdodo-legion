import type { FC } from 'react';

type Props = {
  rows: string[];
  columns: string[];
  value: { [key: string]: string };
  onChange: (value: { [key: string]: string }) => void;
};

export const MatrixInput: FC<Props> = ({ rows, columns, value = {}, onChange }) => {
  const handleSelect = (row: string, column: string) => {
    onChange({
      ...value,
      [row]: column
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="p-4 text-left text-gray-800 dark:text-gray-200 font-medium"></th> {/* Изменено на text-gray-800 и dark:text-gray-200 */}
            {columns.map((column) => (
              <th key={column} className="p-4 text-center text-gray-800 dark:text-gray-200 font-medium"> {/* Изменено на text-gray-800 и dark:text-gray-200 */}
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-t border-gray-500 dark:border-gray-600"> {/* Изменено на border-gray-500 и dark:border-gray-600 */}
              <td className="p-4 text-left text-gray-900 dark:text-gray-100 font-medium"> {/* Изменено на text-gray-900 и dark:text-gray-100 */}
                {row}
              </td>
              {columns.map((column) => (
                <td key={`${row}-${column}`} className="p-4 text-center">
                  <button
                    onClick={() => handleSelect(row, column)}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      value[row] === column
                        ? 'bg-primary border-primary'
                        : 'border-border hover:border-accent'
                    } ${value[row] === column ? 'dark:bg-primary dark:border-primary' : 'dark:border-border dark:hover:border-accent'}`}
                  >
                    {value[row] === column && (
                      <span className="block w-2 h-2 mx-auto bg-primary/90 rounded-full" />
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};