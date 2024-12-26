export default function chart() {
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  return (
    <>
      <RangePicker />
      <h1>{t("content.clipboard")}：</h1>
      <Button>chart</Button>
    </>
  );
}
