import { Image } from "../../src/Image";
import { PageTitle } from "../PageTitle";
import { Sample } from "../Sample";

export function ImageComponent() {
  return (
    <article>
      <PageTitle>Image</PageTitle>

      <Sample id="basic-example" title="Basic example">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Polar_Bear_ANWR_1.jpg/320px-Polar_Bear_ANWR_1.jpg" />
      </Sample>

      <Sample id="fallback" title="Fallback">
        <Image src="https://example.com" fallback={<>Fallback slot</>} />
      </Sample>
    </article>
  );
}
