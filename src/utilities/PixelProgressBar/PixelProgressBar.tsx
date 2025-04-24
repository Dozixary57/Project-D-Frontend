// import "./PixelProgressBar.scss";

// const PixelProgressBar = ({ progress = 0, scales = 0 }: { progress?: number, scales?: number }) => {
//   return (
//     <div className="ProgressBarWrapper">
//       <div className="ProgressBarFrame">
//         <div className="ProgressBarStart" />
//         <div className="ProgressBarMiddle" />
//         <div className="ProgressBarEnd" />
//         {[...Array(scales)].map((_, index) => {
//           const position = (scales === 1)
//             ? 50
//             : (100 / (scales - 1)) * index;

//           return (
//             <div
//               key={index}
//               className="ProgressBarScale"
//               style={{ left: `calc(8px + ${position}%)` }}
//             />
//           );
//         })}
//         {/* <div
//           className="progress-fill"
//           style={{ width: `${progress * 100}%` }}
//         /> */}
//         {/* <div className="progress-scales" /> */}
//       </div>
//     </div>
//   );
// };

// export default PixelProgressBar;
export {};