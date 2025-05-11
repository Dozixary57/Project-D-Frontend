import { useSelector } from 'react-redux';
import { RootState } from '@ReduxStore/store';

const selectFormObjectData = useSelector((state: RootState) => state.formObjectData.editable);