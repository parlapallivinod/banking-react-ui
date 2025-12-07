import Alert from '@mui/material/Alert';
import {type RequestStatus} from '../app/withTypes'

interface RequestStatusComponentProps {
  status: RequestStatus | null;
  setStatus: React.Dispatch<React.SetStateAction<RequestStatus | null>>
}

export default function RequestStatusComponent({status, setStatus}: RequestStatusComponentProps) {
  return (
  <>
    {status && status.type === 'error' &&
    <Alert variant='standard' severity='error' onClose={() => {setStatus(null);}}>
      {status?.message}
    </Alert>
    } 

    {status && status.type === 'success' &&
    <Alert variant='standard' severity='success' onClose={() => {setStatus(null);}}>
      {status?.message}
    </Alert>
    }
  </>
  )
}
