import { RootState } from "@ReduxStore/store";
import { useSelector } from "react-redux";
import loadingSprite from "@images/icons/LoadingSpriteDots.webp";
import "./LoadingIndicators.scss";

const LocalLoadingIndicator = () => {
  const isLoading = useSelector((state: RootState) => state.isLocalLoadingState);

  return (
    <>
      {isLoading &&
        <div className="LOCAL_LOADING_INDICATOR">
          <img src={loadingSprite} alt="Loading dots sprite" />
        </div>
      }
    </>
  )
}

// Not done yet
const GlobalLoadingIndicator = () => {
  const isLoading = useSelector((state: RootState) => state.isGlobalLoadingState);

  return (
    <></>
  )
}
// Not done yet

export {
  LocalLoadingIndicator
}