import styled from "styled-components";
import getDateStringFromTimestamp from "utils/getDateStringFromTimestamp";

const Time = styled.time`
  display: block;
  margin-top: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
`;

type Props = {
  createdAt: number;
  editedAt: number;
};
const TimeIndicator = ({ createdAt, editedAt }: Props) => {
  const lastEdited =
    createdAt === editedAt ? createdAt : editedAt;

  return (
    <Time dateTime={new Date(lastEdited).toISOString()}>
      {getDateStringFromTimestamp(lastEdited) +
        (lastEdited !== createdAt ? " (수정됨)" : "")}
    </Time>
  );
};

export default TimeIndicator;
