import PageHelmet from "@components/PageHelmet/PageHelmet";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "@ReduxStore/store";
import { useEffect, useState } from "react";
import IdeasService from "@services/IdeasService";
import LoadingSpriteDots from "@components/LoadingSprites/LoadingSpriteDots";
import { IIdeaInfo } from "@interfaces/ideas/IIdeaInfo";
import "./ProjectVisionPage.scss"

const ProjectVisionPanel = () => {
  return (
    <div className="PROJECT_VISION_PANEL">
      <div className="CONTENT">
        <Link to="/Vision">
          <p>Join the Vision</p>
        </Link>
      </div>
    </div>
  );
}

const ProjectVisionPage = () => {
  const isAuthorized = useSelector((state: RootState) => state.isAuthorized);

  const [voteHandlingId, setVoteHandlingId] = useState<string | null>(null);

  const objectsListData = useSelector((state: RootState) => state.objectsListData);

  useEffect(() => {
    store.dispatch({ type: 'OBJECTS_LIST_DATA', payload: null })

    const fetchData = async () => {
      store.dispatch({
        type: 'OBJECTS_LIST_DATA',
        payload: await IdeasService.getIdeas()
      })
    }

    fetchData();
  }, []);

  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>, id: string, vote: 1 | -1) => {
    e.preventDefault();
    if (voteHandlingId) return;

    setVoteHandlingId(id);

    await IdeasService.submitIdeaVote(id, vote)
      .then((res) => {
        if (res && res.updatedIdea) {
          console.log(res.updatedIdea);
          store.dispatch({
            type: 'OBJECTS_LIST_DATA',
            payload: objectsListData?.map((obj: IIdeaInfo) =>
              obj._id === res.updatedIdea._id ? res.updatedIdea : obj
            )
          });
        }
      })
      .finally(() => {
        setVoteHandlingId(null);
      });
  };

  return (
    <>
      <Outlet />
      <PageHelmet title="Vision of the Project" />
      <div className="PROJECT_VISION_DATA">
        {objectsListData && objectsListData.map((item: IIdeaInfo) => (
          <Link to={`${item._id}`} state={{ objectData: item }} key={item._id}>
            <div className={`IdeaItem ${item.VoteValue && item.VoteValue > 0 ? 'Positive' : item.VoteValue && item.VoteValue < 0 ? 'Negative' : ''}`}>
              <div className="VoteControls" onClick={(e) => e.preventDefault()}>
                <button
                  className={`Upvote ${item.CurrentUserVote === 1 ? 'Active' : ''}`}
                  onClick={(e) => handleVote(e, item._id, 1)}
                  disabled={!isAuthorized || voteHandlingId ? true : false} />
                <div className="VoteCountContainer">
                  {voteHandlingId === item._id ?
                    <LoadingSpriteDots />
                    :
                    <p className="VoteCount">{item.VoteValue}</p>
                  }
                </div>
                <button
                  className={`Downvote ${item.CurrentUserVote === -1 ? 'Active' : ''}`}
                  onClick={(e) => handleVote(e, item._id, -1)}
                  disabled={!isAuthorized || voteHandlingId ? true : false}
                />
              </div>
              <div className="VoteDescription">
                <div className="Description">
                  <p className="Title">{item.Title} <span>by {item.Author}</span></p>
                  <p className="Annotation">{item.Annotation}</p>
                </div>
                <div className="Tags">
                  <p>Votes: {item.VoteAmount}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export {
  ProjectVisionPanel,
  ProjectVisionPage
};