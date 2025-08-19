defmodule MediaConverter.MediaConverterService do
  @moduledoc """
  Service for converting media files.
  """

  @tmp Path.join(:code.priv_dir(:media_converter), "tmp")

  File.mkdir_p!(@tmp)

  @doc """
  Converts a GIF to MP4 using ffmpeg.
  Returns {:ok, file_path} or {:error, reason}.
  """
  def convert_gif_to_mp4(in_path, filename) do
    out_path = Path.join(@tmp, "#{filename}.mp4")

    case System.cmd("ffmpeg", ["-y", "-i", in_path, out_path], stderr_to_stdout: true) do
      {_, 0} -> {:ok, out_path}
      {err, _} -> {:error, err}
    end
  end

  @doc """
  Convert PNG/JPG/JPEG to WebP.
  """
  def convert_to_webp(in_path, filename) do
    out_path = Path.join(@tmp, "#{filename}.webp")

    case System.cmd("cwebp", ["-q", "80", in_path, "-o", out_path], stderr_to_stdout: true) do
      {_, 0} -> {:ok, out_path}
      {err, _} -> {:error, err}
    end
  end
end
