import Input from "ui/CreatePage/Input";

import styles from "./Form.module.css";

const FactoryTokenForm = () => {
  const handleSubmit = () => {};
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContent}>
        <Input
          id="token"
          label={"Token's Name:"}
          htmlFor="token"
          subtitle="You can specify any name you like. But it is better to come up with something original (min 3, max 50 symbols)"
          placeholder={"John's Obligations"}
          name="token"
          required
        />
      </div>
    </form>
  );
};

export default FactoryTokenForm;
