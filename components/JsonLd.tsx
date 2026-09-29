// 구조화 데이터(JSON-LD). 화면에 보이는 내용과 같은 정보만 넣는다.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON 안의 </script>가 태그를 닫지 않도록 < 를 이스케이프
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
