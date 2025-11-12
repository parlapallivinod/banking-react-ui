import { Outlet } from "react-router";
import { useAppSelector, useAppDispatch } from '../hooks'
import { showLoadingSpinner, hideLoadingSpinner, setLoadingSpinner } from '../reducers/commonSlice'

export default function BaningLayout() {
  const spinner: boolean = useAppSelector(state => state.common.loadingSpinner)
  const dispatch = useAppDispatch()


  console.log("BankingLayout rendered");
  return (
    <>
      <Outlet />
      
   
        
      <div style={{border: '1px solid red', paddingBottom: '10px'}}>
          <div>loadingSpinner: {spinner?1:0}</div>
          <button onClick={() => dispatch(showLoadingSpinner())}>Show</button>
          <button onClick={() => dispatch(hideLoadingSpinner())}>Hide</button>
          <button onClick={() => dispatch(setLoadingSpinner(!spinner))}>Reverse</button>
        
      </div>
        

      <footer>
        <p>&copy; Banking UI</p>
      </footer>
    </>
  )
  
}
