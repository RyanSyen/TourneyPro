import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import { MuiThemeInterface } from 'src/common';

interface AvatarProps {
  username?: string | null | undefined;
  photoUrl?: string;
}

const StyledAvatar = styled(Avatar)<MuiThemeInterface>(({ theme }) => {
  return {
    width: '36px',
    height: '36px',

    [theme.breakpoints.up('sm')]: {
      width: '42px',
      height: '42px',
    },
  };
});

const CustomAvatar = (props: AvatarProps) => {
  const { photoUrl, username } = props;

  if (!photoUrl) {
    return (
      <StyledAvatar alt="profile picture">
        {username?.split('')[0].toUpperCase()}
      </StyledAvatar>
    );
  }

  return <StyledAvatar alt="profile picture" src={photoUrl} />;
};

CustomAvatar.defaultProps = {
  username: '',
  photoUrl: '',
};

export default CustomAvatar;
