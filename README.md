# Permalist

Permalist is a simple to-do list application with PostgreSQL as the database.

## Getting Started

These instructions will help you set up the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [PostgreSQL](https://www.postgresql.org/) installed

### Installing

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/permalist.git
    ```

2. Navigate to the project directory:

    ```bash
    cd permalist
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up the database:

    - Create a PostgreSQL database.
    - Run the queries in `queries.sql` to create the necessary table and insert sample data.

      ```bash
      psql -U your-username -d your-database-name -a -f queries.sql
      ```

      Replace `your-username` and `your-database-name` with your PostgreSQL username and database name.

### Running the Application

1. Start the application:

    ```bash
    npm start
    ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access Permalist.

## Contributing

Feel free to contribute to this project. Create a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
