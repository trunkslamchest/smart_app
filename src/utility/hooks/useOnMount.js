import { useEffect } from 'react'

// const useOnMount = (callback, dependencies, condition) => {
//   const calledOnce = useRef(false);
 
//   useEffect(() => {
//     if (calledOnce.current) {
//       return;
//     }
 
//     console.log(calledOnce, callback, dependencies, condition)

//     if (condition(dependencies)) {
//       callback(dependencies);
 
//       calledOnce.current = true;
//     }
//   }, [callback, condition, dependencies]);
// };



const useOnMount = (f) => { return useEffect(f, []) }

 
// function useOnMount() {
//   const [todos, setTodos] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(
//     () => {
//       setIsLoading(true);
//       fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(response => response.json())
//         .then(data => {
//           setTodos(data);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         })
//     },
//     []
//   );
//   return {
//     isLoading,
//     areThereAnyTodos: todos && todos.length,
//     todos
//   }
// }
 
export default useOnMount