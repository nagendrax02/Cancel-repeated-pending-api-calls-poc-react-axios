// import { useEffect, useState } from "react";
// import "./styles.css";
// import { useDispatch } from "react-redux";
// import { getTodosList } from "./app/store/actions/action";
// import axios from "axios";

// export default function App() {
//   const dispatch = useDispatch();
//   const [callAPIFlag, setCallAPIFlag] = useState(false);
//   const [apicalled, setApiCalled] = useState(false);

//   const [data, setData] = useState(null);
//   // const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cancelToken, setCancelToken] = useState(null);

//   const fetchData = async (url) => {
//     try {
//       // setLoading(true);

//       // Cancel the previous request, if any
//       console.log("cancel token--->", cancelToken);
//       if (cancelToken) {
//         cancelToken.cancel("Request canceled due to new request.");
//       }

//       const newCancelToken = axios.CancelToken.source();
//       setCancelToken(newCancelToken);

//       const response = await axios.get(url, {
//         cancelToken: newCancelToken.token
//       });

//       console.log("response--->", response);

//       setData(response.data);
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log("Request canceled:", error.message);
//       } else {
//         setError(error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // Cleanup function to cancel the request on component unmount
//     return () => {
//       if (cancelToken) {
//         cancelToken.cancel("Request canceled due to component unmount.");
//       }
//     };
//   }, [callAPIFlag]);

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <button
//         onClick={() => {
//           // setCallAPIFlag(!callAPIFlag)
//           fetchData("https://jsonplaceholder.typicode.com/todos");
//         }}
//       >
//         Call todo Api
//       </button>
//       <button
//         onClick={() => fetchData("https://jsonplaceholder.typicode.com/posts")}
//       >
//         Call Users reqres api
//       </button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [cancelTokens, setCancelTokens] = useState({
    todos: null,
    posts: null
  });

  const fetchData = async (url, apiType) => {
    try {
      const cancelTokenSource = cancelTokens[apiType];

      if (cancelTokenSource) {
        // If there is a previous request of the same type, cancel it
        cancelTokenSource.cancel("Request canceled due to new request.");
      }

      // Create a new cancel token for the current request
      const newCancelToken = axios.CancelToken.source();

      // Update the cancel tokens state
      setCancelTokens((prevTokens) => ({
        ...prevTokens,
        [apiType]: newCancelToken
      }));

      // Make the API request with the new cancel token
      const response = await axios.get(url, {
        cancelToken: newCancelToken.token
      });

      // Set the data in the state
      setData(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle request cancellation
        console.log("Request canceled:", error.message);
      } else {
        // Handle other errors
        setError(error);
      }
    }
  };

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        // Call the todos API
        await fetchData("https://jsonplaceholder.typicode.com/todos", "todos");

        // Call the posts API
        await fetchData("https://jsonplaceholder.typicode.com/posts", "posts");
      } catch (error) {
        // Handle errors if needed
      }
    };

    // Call the wrapper function inside the useEffect
    fetchDataWrapper();

    // Cleanup function to cancel all requests if the component is unmounted
    return () => {
      Object.values(cancelTokens).forEach((cancelToken) => {
        if (cancelToken) {
          cancelToken.cancel("Request canceled due to component unmount.");
        }
      });
    };
  }, []); // The effect runs only once on component mount

  return (
    <div className="App">
      <h1>POC on Cancel repeated api calls</h1>
      <h2>Using axios cancel token</h2>
      <button
        onClick={() =>
          fetchData("https://jsonplaceholder.typicode.com/todos", "todos")
        }
      >
        Call todo Api
      </button>
      <button
        onClick={() =>
          fetchData("https://jsonplaceholder.typicode.com/posts", "posts")
        }
      >
        Call post api
      </button>
      <button
        onClick={() =>
          fetchData("https://jsonplaceholder.typicode.com/albums", "albums")
        }
      >
        Call album api
      </button>
      <button
        onClick={() =>
          fetchData("https://jsonplaceholder.typicode.com/photos", "photos")
        }
      >
        Call photo api
      </button>
    </div>
  );
}

// https://jsonplaceholder.typicode.com/albums
// https://jsonplaceholder.typicode.com/photos
