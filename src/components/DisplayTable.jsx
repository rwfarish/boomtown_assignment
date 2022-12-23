const DisplayTable = ({name, id, type, login, message}) => {

    //very basic table to visually display the id information returned from the api endpoints
 
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Event Type</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{type}</td>
            <td>{login}</td>
          </tr>
        </tbody>
      </table>
      );
  };
  
  export default DisplayTable;