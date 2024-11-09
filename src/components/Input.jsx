import PropTypes from "prop-types";
export default function Input({
  value,
  type,
  id,
  handleOnBlur,
  handleOnChange,
  placeholder,
  className,
  isError,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label label-text" htmlFor={id}>
        {placeholder}
      </label>
      <input
        name={id}
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
        {...props}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        className={`input input-bordered ${className} ${
          isError && "input-error"
        }`}
      />
      {isError && (
        <label className="label-text text-error" htmlFor={id}>
          Error
        </label>
      )}
    </div>
  );
}
Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  handleOnBlur: PropTypes.func,
  handleOnChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isError: PropTypes.bool,
  value: PropTypes.any,
};
