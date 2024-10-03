import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./input";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const schema = z.object({
  surname: z.string().min(1, "Поле является обязательным"),
  name: z.string().min(1, "Поле является обязательным"),
  patronymic: z.string().optional(),
  gender: z.enum(["", "Мужской", "Женский"]),
  dateOfBirth: z
    .date()
    .optional()
    .nullable()
    .refine(
      (val) => val !== null && val !== undefined,
      "Поле является обязательным"
    ),
  phoneNumber: z.string().regex(/^([78])\d{10}$/, "Поле является обязательным"),
  email: z.string().email("Введен некорректный адрес почты"),
  registrationAddress: z.string().optional(),
  employerName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const EmployeeForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      surname: "",
      name: "",
      patronymic: "",
      gender: "",
      dateOfBirth: undefined,
      phoneNumber: "",
      email: "",
      registrationAddress: "",
      employerName: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2 className="title">Информация о сотруднике</h2>
      <div>
        <Controller
          name="surname"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              placeholder="Фамилия"
              type="text"
              className={`${errors.surname && "input-error"}`}
            />
          )}
        />
        {errors.surname && (
          <p className="error-text">{errors.surname.message}</p>
        )}
      </div>
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Имя"
              {...field}
              type="text"
              className={`${errors.name && "input-error"}`}
            />
          )}
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}
      </div>

      <div>
        <Controller
          name="patronymic"
          control={control}
          render={({ field }) => (
            <FormInput placeholder="Отчество" {...field} type="text" />
          )}
        />
      </div>

      <div className="flex-input">
        <label className="gender-input" htmlFor="gender">
          <span>Пол:</span>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} id="gender">
                <option
                  value=""
                  disabled
                  style={{ visibility: "hidden", height: 0, width: 0 }}
                ></option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </select>
            )}
          />
        </label>
        <div>
          <div className={`date-input ${errors.dateOfBirth && "input-error"}`}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                    placeholderText="Дата рождения"
                  />
                );
              }}
            />
            {errors.dateOfBirth && (
              <p className="error-text">{errors.dateOfBirth.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-input">
        <div>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <FormInput
                placeholder="Мобильный телефон"
                {...field}
                type="text"
                className={`${errors.phoneNumber && "input-error"}`}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="error-text">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                placeholder="Email"
                type="text"
                className={`${errors.email && "input-error"}`}
              />
            )}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Controller
          name="registrationAddress"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Адрес постоянной регистрации"
              {...field}
              type="text"
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="employerName"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Название работодателя"
              {...field}
              type="text"
            />
          )}
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
};
export default EmployeeForm;
