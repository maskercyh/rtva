export default function button() {
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  return (
    <>
      <RangePicker />
      <h1>{t("content.clipboard")}：</h1>
      <Button>按钮</Button>
    </>
  );
}
