import { categories } from "configs/firebase.config";
import styled from "styled-components";
import { cssCategoryBadgeNotColored } from "styles/css";

const EmBadge = styled.em`
  ${cssCategoryBadgeNotColored}

  color: #fff;
  background-color: ${(props) => props.theme.accentColor};
`;

const CategoryBadge = ({
  categoryKey,
}: {
  categoryKey: string;
}) => {
  const [categoryString, iconUrl] = categories[categoryKey];

  return (
    <EmBadge iconUrl={iconUrl}>{categoryString}</EmBadge>
  );
};

export default CategoryBadge;
