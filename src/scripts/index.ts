import axios from "axios";
import { err, ok, ResultAsync } from "neverthrow";

import { Scanners } from "~/scanner";
import { Searchers } from "~/searcher";

function isReachable(url: string) {
  return ResultAsync.fromPromise(
    axios.get(url, { timeout: 10 * 1000 }),
    (e: unknown) => e,
  ).mapErr((e) => {
    if (axios.isAxiosError(e)) {
      return err(`${url} is not reachable`);
    }
    return e;
  });
}

(async (): Promise<void> => {
  const urls = Array.from(
    new Set(
      Searchers.map((s) => s.baseURL).concat(Scanners.map((s) => s.baseURL)),
    ),
  );

  const results = await Promise.all(
    urls.map((u) => ok(u).asyncAndThen((u) => isReachable(u))),
  );

  const errors = results.filter((r) => r.isErr());
  if (errors.length > 0) {
    errors.forEach((e) => {
      console.error(e);
    });
  } else {
    console.log("All goes well");
  }
})();
