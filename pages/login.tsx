import {useState} from "react";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import {Formik, Form} from "formik";
import * as Yup from "yup";

import Link from "next/link";
import styled from "styled-components";
import {UserAuth} from "../contexts/AuthContext";

//custom Theme
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {letterSpacing} from "@mui/system";
import Register from "../components/Register";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1877f2",
    },
    success: {
      main: "#42b72a",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const StyledButton = styled(Button)`
  &:hover {
    background-color: #166fe5;
  }
`;
export const StyledSuccessButton = styled(Button)`
  margin-top: "16px";
  color: white;
  &:hover {
    background-color: #36a420;
  }
`;

//formik
interface IInitValue {
  email: string;
  password: string;
}
const initialValues: IInitValue = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("email không hợp lệ")
    .required("Vui lòng nhập email của bạn"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

//Conponent
const Login = () => {
  //firebase
  const {googleSignIn, user} = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const [openRegister, setOpenRegister] = useState(false);

  const [showPwd, setShowPwd] = useState(false);
  const handleClickShowPassword = () => {
    setShowPwd(!showPwd);
  };
  return (
    <ThemeProvider theme={theme}>
      {/* Register  */}
      <Register openRegister={openRegister} setOpenRegister={setOpenRegister} />
      {/* end Register  */}

      <Stack
        sx={{bgcolor: "#f0f2f5", width: "100%", height: "80vh"}}
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {/* Logo  */}
        <Stack sx={{width: "548px", pr: "60px", transform: "translateY(-50%)"}}>
          <img
            style={{marginLeft: "-32px"}}
            width={301}
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
            alt="fakebook-logo"
          />
          <Typography variant="h2" sx={{fontSize: "28px"}}>
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </Typography>
        </Stack>
        {/* end Logo  */}

        <Stack sx={{width: "396px"}} spacing={2}>
          {/* Login Form */}
          <Paper sx={{p: 2}} elevation={3}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              {(formik) => (
                <Form>
                  {/* email  */}
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      sx={{my: "6px"}}
                      placeholder="Email hoặc số điện thoại"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(formik.errors.email)}
                    />
                    {formik.errors.email ? (
                      <FormHelperText error>
                        {formik.errors.email}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  {/* end email  */}

                  {/* password  */}
                  <FormControl fullWidth>
                    <TextField
                      type={showPwd ? "text" : "password"}
                      fullWidth
                      sx={{my: "6px"}}
                      placeholder="Mật khẩu"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(formik.errors.password)}
                      InputProps={
                        formik.values.password
                          ? {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPwd ? (
                                      <VisibilityIcon />
                                    ) : (
                                      <VisibilityOffIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }
                          : {}
                      }
                    />
                    {formik.errors.password ? (
                      <FormHelperText error>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  {/* end password  */}

                  <Stack
                    sx={{mt: "10px", mb: "16px"}}
                    spacing={2}
                    alignItems="center"
                  >
                    {/* Submit button  */}
                    <StyledButton
                      disableElevation
                      color="primary"
                      sx={{
                        fontSize: "20px",
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      Đăng nhập
                    </StyledButton>
                    {/* end Submit button  */}

                    {/* forgot password */}
                    <Link href="#">
                      <StyledA
                        style={{
                          color: "#1877f2",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Quên mật khẩu?
                      </StyledA>
                    </Link>
                    {/* end forgot password */}
                  </Stack>

                  <Divider />

                  {/* Register Button  */}
                  <Stack justifyContent="center" alignItems="center" p={2}>
                    <StyledSuccessButton
                      disableElevation
                      color="success"
                      sx={{
                        px: 2,
                        fontSize: "17px",
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                      variant="contained"
                      onClick={() => {
                        setOpenRegister(true);
                      }}
                    >
                      Tạo tài khoản mới
                    </StyledSuccessButton>
                  </Stack>
                  {/* end RegisterButton  */}
                </Form>
              )}
            </Formik>
          </Paper>
          {/* end Login Form  */}

          {/* create Page  */}
          <Button
            disableElevation
            fullWidth
            size="large"
            variant="contained"
            onClick={handleGoogleSignIn}
            sx={{
              color: "grey.700",
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.grey[50],
              },
            }}
          >
            <Box sx={{mr: {xs: 1, sm: 2, width: 20}}}>
              <img src={"/google.svg"} alt="google" width={16} height={16} />
            </Box>
            Sign in with Google
          </Button>
          <div style={{textAlign: "center"}}>
            <p>
              <Link href="#">
                <StyledA>
                  <b>Tạo Trang</b>
                </StyledA>
              </Link>{" "}
              dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp{" "}
            </p>
          </div>
          {/* end createPage */}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default Login;
