import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { useAppSelector } from '@store/hooks';

const AuthSuccess: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Вы авторизированы
      </Typography>
      {user && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">Профиль</Typography>
            <Typography>ID: {user.id}</Typography>
            <Typography>Ник: {user.nickname}</Typography>
            <Typography>Email: {user.email}</Typography>
            {user.role && <Typography>Роль: {user.role}</Typography>}
            {(user as any).needsProfileFetch && (
              <Typography color="warning.main" sx={{ mt: 1 }}>
                Получение полного профиля...
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default AuthSuccess;


