import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  createNewUserInDatabase,
  getUserFavoriteMovies,
} from '../../utils/functions';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {GlobalStyles} from '../../constants/constants';
import {updateUserId} from '../../state/auth/authSlice';
import {RootStackParamList} from '../../types/screenTypes';
import {createUser, signInUser} from '../../utils/authFunctions';
import {setUserFavorites} from '../../state/content/contentSlice';

interface AuthScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'AuthStack'>;
}

interface UserDataProps {
  username?: string;
  email: string;
  password: string;
}

const initialFormInputs = {
  email: '',
  password: '',
};

const AuthScreen = ({navigation}: AuthScreenProps) => {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataProps>(initialFormInputs);
  const [authError, setAuthError] = useState<string>('');

  const handleFormChange = () => {
    setShowLogin(!showLogin);
    setUserData(initialFormInputs);
  };

  // handling user input data
  const handleInputChange: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => void = (e, name) => {
    const value = e.nativeEvent.text;
    setUserData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const signUpHandler = async () => {
    createUser(userData, async (userId, error) => {
      if (userId) {
        const createNewUser = await createNewUserInDatabase(userId);
        if (createNewUser.status === 201) {
          dispatch(updateUserId(userId));
          navigation.navigate('Browse');
        }
      } else {
        setAuthError(error!);
      }
    });
  };

  const loginHandler = async () => {
    signInUser(userData, async userId => {
      if (userId) {
        dispatch(updateUserId(userId));
        const userDataDB = await getUserFavoriteMovies(userId);
        const userFavorites = userDataDB?.data.data.favoriteMovies;
        dispatch(setUserFavorites(userFavorites));
        navigation.navigate('Browse');
      } else {
        setAuthError('Invalid login credentials.');
      }
    });
  };

  return (
    <ImageBackground
      source={require('../../../assets/movieSc.jpg')}
      style={styles.imageLayout}>
      <View style={styles.mainContainer}>
        <View>
          <View>
            <Text style={styles.textHeader}>
              {showLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
            </Text>
          </View>
          <View>
            <View style={styles.inputContainer}>
              {!showLogin && (
                <Input
                  placeholder="Username"
                  onChange={e => handleInputChange(e, 'username')}
                />
              )}
              <Input
                placeholder="Email"
                onChange={e => handleInputChange(e, 'email')}
              />
              <Input
                placeholder="Password"
                onChange={e => handleInputChange(e, 'password')}
                secureTextEntry
              />
            </View>
            {authError && <Text style={styles.error}>{authError}</Text>}
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                onPress={showLogin ? loginHandler : signUpHandler}>
                {showLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.text}>
            {showLogin ? 'Not a member yet? ' : 'Already a member? '}
          </Text>
          <TouchableOpacity onPress={handleFormChange}>
            <Text style={styles.link}>{showLogin ? 'REGISTER' : 'LOGIN'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  imageLayout: {
    flex: 1,
  },
  inputContainer: {
    minWidth: 300,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 7,
    marginBottom: 20,
  },
  textHeader: {
    fontSize: 27,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 30,
    color: GlobalStyles.colors.mainText,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    color: GlobalStyles.colors.mainText,
  },
  error: {
    fontSize: 20,
    color: GlobalStyles.colors.primary,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  link: {
    fontSize: 20,
    fontWeight: '500',
    color: GlobalStyles.colors.primary,
  },
});
