import {
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {StyledSuccessButton} from "../pages/login";
import {Dispatch, SetStateAction} from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";

const letDay = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
};
const days = letDay();

const letMonth = () => {
  const months = [];
  for (let i = 1; i <= 12; ++i) {
    months.push(`Tháng ${i}`);
  }
  return months;
};
const months = letMonth();

const letYear = () => {
  const years = [];
  for (let i = 1905; i <= 2022; i++) {
    years.push(i);
  }
  return years;
};
const years = letYear()?.reverse();

//formik
interface IInitValue {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  dayOfBirth: number | string;
  monthOfBirth: number | string;
  yearOfBirth: number | string;
  sex: string | null;
}
const initialValues: IInitValue = {
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  dayOfBirth: "",
  monthOfBirth: "",
  yearOfBirth: "",
  sex: "",
};
const validationSchema = Yup.object({
  lastName: Yup.string().required("Bắt buộc"),
  firstName: Yup.string().required("Bắt buộc"),
  email: Yup.string()
    .email("email không hợp lệ")
    .required("Vui lòng nhập email của bạn"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  dayOfBirth: Yup.number().required("Bắt buộc"),
  monthOfBirth: Yup.number().required("Bắt buộc"),
  yearOfBirth: Yup.number().required("Bắt buộc"),
  sex: Yup.string().required("Bắt buộc"),
});

const Register = ({
  openRegister,
  setOpenRegister,
}: {
  openRegister: boolean;
  setOpenRegister: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log(values);
      }}
      enableReinitialize
    >
      {(formik) => (
        <Stack
          sx={{
            display: openRegister ? "flex" : "none",
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            bgcolor: "rgba(255,255,255,0.8)",
            zIndex: 999,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Paper sx={{width: "432px"}}>
            {/* header  */}
            <Stack sx={{padding: "10px 16px"}}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h2" fontSize={32} fontWeight={600}>
                  Đăng ký
                </Typography>
                {/* close Button  */}
                <IconButton
                  onClick={() => {
                    setOpenRegister(false);
                    formik.resetForm();
                  }}
                >
                  <CloseIcon />
                </IconButton>
                {/* end close Button  */}
              </Stack>
              <p style={{margin: 0}}>Nhanh chóng và dễ dàng.</p>
            </Stack>
            {/* end header  */}

            <Divider />

            {/* Register Form  */}
            <Stack p={2}>
              <Form style={{width: "100%"}}>
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                      {/* firstName */}
                      <FormControl sx={{flex: 1}}>
                        <TextField
                          size="small"
                          placeholder="Họ"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            formik.errors.lastName && formik.touched.lastName
                          )}
                        />
                        {formik.errors.lastName && formik.touched.lastName ? (
                          <FormHelperText error>
                            {formik.errors.lastName}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                      {/* end firstName */}

                      {/* lastName */}
                      <FormControl sx={{flex: 1}}>
                        <TextField
                          size="small"
                          placeholder="Tên"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            formik.errors.firstName && formik.touched.firstName
                          )}
                        />
                        {formik.errors.firstName && formik.touched.firstName ? (
                          <FormHelperText error>
                            {formik.errors.firstName}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                      {/* end lastName */}
                    </Stack>

                    {/* email */}
                    <FormControl>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                          formik.errors.email && formik.touched.email
                        )}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <FormHelperText error>
                          {formik.errors.email}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                    {/*end email */}

                    {/* password */}
                    <FormControl>
                      <TextField
                        type="password"
                        size="small"
                        fullWidth
                        placeholder="Mật khẩu"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                          formik.errors.password && formik.touched.password
                        )}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <FormHelperText error>
                          {formik.errors.password}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                    {/* end password */}

                    {/* birth */}
                    <Stack>
                      <p style={{margin: 0, fontSize: "12px"}}>Ngày sinh</p>
                      <Stack direction="row" spacing={1}>
                        {/* dayOfBirth */}
                        <FormControl sx={{flex: 1}}>
                          <TextField
                            size="small"
                            select
                            name="dayOfBirth"
                            value={formik.values.dayOfBirth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                              formik.errors.dayOfBirth &&
                                formik.touched.dayOfBirth
                            )}
                          >
                            {days.map((day) => (
                              <MenuItem key={day} value={day}>
                                {day}
                              </MenuItem>
                            ))}
                          </TextField>
                          {formik.errors.dayOfBirth &&
                          formik.touched.dayOfBirth ? (
                            <FormHelperText error>
                              {formik.errors.dayOfBirth}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                        {/* end dayOfBirth */}

                        {/* monthOfBirth */}
                        <FormControl sx={{flex: 1}}>
                          <TextField
                            size="small"
                            select
                            name="monthOfBirth"
                            value={formik.values.monthOfBirth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                              formik.errors.monthOfBirth &&
                                formik.touched.monthOfBirth
                            )}
                          >
                            {months.map((month, i) => (
                              <MenuItem key={month} value={i + 1}>
                                {month}
                              </MenuItem>
                            ))}
                          </TextField>
                          {formik.errors.monthOfBirth &&
                          formik.touched.monthOfBirth ? (
                            <FormHelperText error>
                              {formik.errors.monthOfBirth}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                        {/* end monthOfBirth */}

                        {/* yearOfBirth */}
                        <FormControl sx={{flex: 1}}>
                          <TextField
                            size="small"
                            select
                            name="yearOfBirth"
                            value={formik.values.yearOfBirth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(
                              formik.errors.yearOfBirth &&
                                formik.touched.yearOfBirth
                            )}
                          >
                            {years.map((year) => (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            ))}
                          </TextField>
                          {formik.errors.yearOfBirth &&
                          formik.touched.yearOfBirth ? (
                            <FormHelperText error>
                              {formik.errors.yearOfBirth}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                        {/* end yearOfBirth */}
                      </Stack>
                    </Stack>
                    {/* end birth  */}

                    {/* Gender */}
                    <Stack>
                      <p style={{margin: 0, fontSize: "12px"}}>Giới tính</p>
                      <FormControl>
                        <Stack direction="row" spacing={1}>
                          {/* female */}
                          <label htmlFor="female" style={{width: "33%"}}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              width="100%"
                              p={1}
                              sx={{
                                border: Boolean(!formik.errors.sex)
                                  ? "#333 1px solid"
                                  : "red 1px solid",
                                borderRadius: "6px",
                              }}
                            >
                              <label htmlFor="female">Nữ</label>
                              <input
                                type="radio"
                                id="female"
                                name="sex"
                                value="female"
                                onChange={(e) => {
                                  formik.handleChange(e);
                                }}
                              ></input>
                            </Stack>
                          </label>
                          {/* end female  */}

                          {/* male */}
                          <label htmlFor="male" style={{width: "33%"}}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              width="100%"
                              p={1}
                              sx={{
                                border: Boolean(!formik.errors.sex)
                                  ? "#333 1px solid"
                                  : "red 1px solid",
                                borderRadius: "6px",
                              }}
                            >
                              <label htmlFor="male">Nam</label>
                              <input
                                type="radio"
                                id="male"
                                name="sex"
                                value="male"
                                onChange={(e) => {
                                  formik.handleChange(e);
                                }}
                              ></input>
                            </Stack>
                          </label>
                          {/* end male */}

                          {/* other */}
                          <label htmlFor="other" style={{width: "33%"}}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              width="100%"
                              p={1}
                              sx={{
                                border: Boolean(!formik.errors.sex)
                                  ? "#333 1px solid"
                                  : "red 1px solid",
                                borderRadius: "6px",
                              }}
                            >
                              <label htmlFor="other">Tùy chỉnh</label>
                              <input
                                type="radio"
                                id="other"
                                name="sex"
                                value="other"
                                onChange={(e) => {
                                  formik.handleChange(e);
                                }}
                              ></input>
                            </Stack>
                          </label>
                          {/* end other */}
                        </Stack>
                        {formik.errors.sex && formik.touched.sex ? (
                          <FormHelperText error>
                            {formik.errors.sex}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Stack>
                    {/* end Gender  */}

                    <Stack>
                      <p style={{margin: 0, fontSize: "12px"}}>
                        Người dùng dịch vụ của chúng tôi có thể đã tải thông tin
                        liên hệ của bạn lên Facebook. Tìm hiểu thêm.
                      </p>
                    </Stack>
                    <Stack>
                      <p style={{margin: 0, fontSize: "12px"}}>
                        Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản,
                        Chính sách quyền riêng tư và Chính sách cookie của chúng
                        tôi. Bạn có thể nhận được thông báo của chúng tôi qua
                        SMS và hủy nhận bất kỳ lúc nào.
                      </p>
                    </Stack>
                  </Stack>

                  {/* submit btn */}
                  <StyledSuccessButton
                    type="submit"
                    disableElevation
                    color="success"
                    sx={{
                      px: 2,
                      fontSize: "17px",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                    variant="contained"
                    // disabled={!formik.isValid}
                  >
                    Đăng ký
                  </StyledSuccessButton>
                  {/* end submit btn  */}
                </Stack>
              </Form>
            </Stack>
            {/* end Register Form  */}
          </Paper>
        </Stack>
      )}
    </Formik>
  );
};

export default Register;
