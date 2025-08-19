defmodule MediaConverterWeb.ConversionController do
  use MediaConverterWeb, :controller
  alias MediaConverter.MediaConverterService

  def create(conn, %{"file" => %Plug.Upload{} = upload}) do
    result =
      case upload.content_type do
        "image/gif" ->
          MediaConverterService.convert_gif_to_mp4(upload.path, Path.rootname(upload.filename))

        "image/png" ->
          MediaConverterService.convert_to_webp(upload.path, Path.rootname(upload.filename))

        "image/jpeg" ->
          MediaConverterService.convert_to_webp(upload.path, Path.rootname(upload.filename))

        _ ->
          {:error, "Unsupported file type"}
      end

    case result do
      {:ok, out_path} ->
        filename = Path.basename(out_path)

        conn
        |> put_resp_content_type("application/octet-stream")
        |> put_resp_header("content-disposition", "attachment; filename=\"#{filename}\"")
        |> send_file(200, out_path)
        |> then(fn conn ->
          File.rm(out_path)
          conn
        end)
        |> halt()

      {:error, reason} ->
        conn
        |> put_status(500)
        |> json(%{error: "Conversion failed: #{inspect(reason)}"})
        |> halt()
    end
  end
end
