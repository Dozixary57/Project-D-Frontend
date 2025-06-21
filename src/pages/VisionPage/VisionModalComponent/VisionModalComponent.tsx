import PageHelmet from "@components/PageHelmet/PageHelmet";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "@ReduxStore/store";
import { useEffect, useState } from "react";
import LoadingSpriteDots from "@components/LoadingSprites/LoadingSpriteDots";
import { IIdeaInfo } from "@interfaces/ideas/IIdeaInfo";
import IdeasService from "@services/IdeasService";
import "./VisionModalComponent.scss"

const VisionModalComponent = () => {
  const location = useLocation();
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  const { titleId } = useParams();

  const objectsListData = useSelector((state: RootState) => state.objectsListData);

  const [ideaData, setIdeaData] = useState<IIdeaInfo | null>(location.state?.objectData);

  const [isVoteHandling, setIsVoteHandling] = useState<boolean>(false);

  useEffect(() => {
    if (ideaData) return;

    const fetchData = async () => {
      const res = await IdeasService.getIdeaById(titleId as string);
      setIdeaData(res);
    }

    fetchData();
  }, [ideaData]);

  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>, id: string, vote: 1 | -1) => {
    e.preventDefault();
    if (isVoteHandling) return;

    setIsVoteHandling(true);

    await IdeasService.submitIdeaVote(id, vote)
      .then((res) => {
        if (res && res.updatedIdea) {
          setIdeaData(res.updatedIdea);
          store.dispatch({
            type: 'OBJECTS_LIST_DATA',
            payload: objectsListData?.map((obj: IIdeaInfo) =>
              obj._id === res.updatedIdea._id ? res.updatedIdea : obj
            )
          });
        }
      })
      .finally(() => {
        setIsVoteHandling(false);
      });
  };

  return (
    <>
      <PageHelmet title={`${ideaData?.Title} - Idea Vision` || 'The Idea Vision'} />
      <div className="VISION_IDEA_DATA">
        <div className="Header">
          <p>{ideaData?.Title}</p>
        </div>
        <div className="Content">
          <div className="Annotation">
            <p>{ideaData?.Annotation}</p>
          </div>
          <div className="RatingButtons">
            {isAuthorized ? <>
              {isVoteHandling ?
                <LoadingSpriteDots width="2.5em" />
                :
                <>
                  <button
                    onClick={(e) => handleVote(e, ideaData?._id as string, -1)}
                    className={`${ideaData?.CurrentUserVote === -1 ? 'active' : ''}`}
                    disabled={!isAuthorized || isVoteHandling}
                  >
                    <img src={require("@images/icons/VoteArrowInactive.png")} />
                    <p>Downvote</p>
                  </button>
                  <button
                    onClick={(e) => handleVote(e, ideaData?._id as string, 1)}
                    className={`${ideaData?.CurrentUserVote === 1 ? 'active' : ''}`}
                    disabled={!isAuthorized || isVoteHandling}
                  >
                    <img src={require("@images/icons/VoteArrowInactive.png")} />
                    <p>Upvote</p>
                  </button>
                </>
              }
            </>
              :
              <button>
                <p>You need to be logged in to vote</p>
              </button>
            }
          </div>
          <div className="Description">
            {ideaData?.Description
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default VisionModalComponent;